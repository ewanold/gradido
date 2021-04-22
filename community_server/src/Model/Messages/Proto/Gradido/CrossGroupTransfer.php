<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: gradido/GradidoTransfer.proto

namespace Proto\Gradido;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>proto.gradido.CrossGroupTransfer</code>
 */
class CrossGroupTransfer extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.proto.gradido.TransferAmount sender = 1;</code>
     */
    private $sender = null;
    /**
     * Generated from protobuf field <code>bytes receiver = 2;</code>
     */
    private $receiver = '';
    /**
     * Generated from protobuf field <code>string other_group = 3;</code>
     */
    private $other_group = '';
    /**
     * this matches related OutboundTransfer.paired_transaction_id
     *
     * Generated from protobuf field <code>.proto.gradido.Timestamp paired_transaction_id = 4;</code>
     */
    private $paired_transaction_id = null;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \Proto\Gradido\TransferAmount $sender
     *     @type string $receiver
     *     @type string $other_group
     *     @type \Proto\Gradido\Timestamp $paired_transaction_id
     *           this matches related OutboundTransfer.paired_transaction_id
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Gradido\GradidoTransfer::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>.proto.gradido.TransferAmount sender = 1;</code>
     * @return \Proto\Gradido\TransferAmount
     */
    public function getSender()
    {
        return $this->sender;
    }

    /**
     * Generated from protobuf field <code>.proto.gradido.TransferAmount sender = 1;</code>
     * @param \Proto\Gradido\TransferAmount $var
     * @return $this
     */
    public function setSender($var)
    {
        GPBUtil::checkMessage($var, \Proto\Gradido\TransferAmount::class);
        $this->sender = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>bytes receiver = 2;</code>
     * @return string
     */
    public function getReceiver()
    {
        return $this->receiver;
    }

    /**
     * Generated from protobuf field <code>bytes receiver = 2;</code>
     * @param string $var
     * @return $this
     */
    public function setReceiver($var)
    {
        GPBUtil::checkString($var, False);
        $this->receiver = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string other_group = 3;</code>
     * @return string
     */
    public function getOtherGroup()
    {
        return $this->other_group;
    }

    /**
     * Generated from protobuf field <code>string other_group = 3;</code>
     * @param string $var
     * @return $this
     */
    public function setOtherGroup($var)
    {
        GPBUtil::checkString($var, True);
        $this->other_group = $var;

        return $this;
    }

    /**
     * this matches related OutboundTransfer.paired_transaction_id
     *
     * Generated from protobuf field <code>.proto.gradido.Timestamp paired_transaction_id = 4;</code>
     * @return \Proto\Gradido\Timestamp
     */
    public function getPairedTransactionId()
    {
        return $this->paired_transaction_id;
    }

    /**
     * this matches related OutboundTransfer.paired_transaction_id
     *
     * Generated from protobuf field <code>.proto.gradido.Timestamp paired_transaction_id = 4;</code>
     * @param \Proto\Gradido\Timestamp $var
     * @return $this
     */
    public function setPairedTransactionId($var)
    {
        GPBUtil::checkMessage($var, \Proto\Gradido\Timestamp::class);
        $this->paired_transaction_id = $var;

        return $this;
    }

}
