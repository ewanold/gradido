<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: gradido/GradidoTransfer.proto

namespace Proto\Gradido;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>proto.gradido.LocalTransfer</code>
 */
class LocalTransfer extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.proto.gradido.TransferAmount sender = 1;</code>
     */
    protected $sender = null;
    /**
     * Generated from protobuf field <code>bytes recipiant = 2;</code>
     */
    protected $recipiant = '';

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \Proto\Gradido\TransferAmount $sender
     *     @type string $recipiant
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Gradido\GradidoTransfer::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>.proto.gradido.TransferAmount sender = 1;</code>
     * @return \Proto\Gradido\TransferAmount|null
     */
    public function getSender()
    {
        return isset($this->sender) ? $this->sender : null;
    }

    public function hasSender()
    {
        return isset($this->sender);
    }

    public function clearSender()
    {
        unset($this->sender);
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
     * Generated from protobuf field <code>bytes recipiant = 2;</code>
     * @return string
     */
    public function getRecipiant()
    {
        return $this->recipiant;
    }

    /**
     * Generated from protobuf field <code>bytes recipiant = 2;</code>
     * @param string $var
     * @return $this
     */
    public function setRecipiant($var)
    {
        GPBUtil::checkString($var, False);
        $this->recipiant = $var;

        return $this;
    }

}

