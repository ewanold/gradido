<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: gradido/GradidoTransfer.proto

namespace GPBMetadata\Gradido;

class GradidoTransfer
{
    public static $is_initialized = false;

    public static function initOnce() {
        $pool = \Google\Protobuf\Internal\DescriptorPool::getGeneratedPool();

        if (static::$is_initialized == true) {
          return;
        }
        \GPBMetadata\Gradido\BasicTypes::initOnce();
        $pool->internalAddGeneratedFile(
            '
�
gradido/GradidoTransfer.protoproto.gradido"Q
LocalTransfer-
sender (2.proto.gradido.TransferAmount
	recipiant ("�
CrossGroupTransfer.
transfer (2.proto.gradido.LocalTransfer
other_group (	7
paired_transaction_id (2.proto.gradido.Timestamp"�
GradidoTransfer-
local (2.proto.gradido.LocalTransferH 4
inbound (2!.proto.gradido.CrossGroupTransferH 5
outbound (2!.proto.gradido.CrossGroupTransferH B
databproto3'
        , true);

        static::$is_initialized = true;
    }
}

